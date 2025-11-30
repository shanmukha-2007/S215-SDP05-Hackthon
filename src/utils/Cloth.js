// Cloth simulation adapted for react-three-fiber
export default function Cloth(w, h) {
  const GRAVITY = 9.8;
  const MASS = 0.1;
  const DAMPING = 0.01;
  const TIMESTEP = 18 / 1000;
  const WIND = true;

  const particles = [];
  const constraints = [];

  function Particle(x, y, z) {
    this.position = new THREE.Vector3(x, y, z);
    this.previous = new THREE.Vector3(x, y, z);
    this.original = new THREE.Vector3(x, y, z);
    this.a = new THREE.Vector3(0, 0, 0);
  }

  Particle.prototype.addForce = function (force) {
    this.a.add(force.clone().divideScalar(MASS));
  };

  Particle.prototype.integrate = function (dtSq) {
    const newPos = this.position
      .clone()
      .add(this.position.clone().sub(this.previous).multiplyScalar(1 - DAMPING))
      .add(this.a.multiplyScalar(dtSq));
    this.previous.copy(this.position);
    this.position.copy(newPos);
    this.a.set(0, 0, 0);
  };

  function satisfyConstraints(p1, p2, distance) {
    const diff = p2.position.clone().sub(p1.position);
    const currentDist = diff.length();

    if (currentDist === 0) return;

    const correction = diff.multiplyScalar(1 - distance / currentDist);
    const correctionHalf = correction.multiplyScalar(0.5);

    p1.position.add(correctionHalf);
    p2.position.sub(correctionHalf);
  }

  const clothWidth = w;
  const clothHeight = h;

  for (let v = 0; v <= clothHeight; v++) {
    for (let u = 0; u <= clothWidth; u++) {
      particles.push(new Particle(u / clothWidth, -v / clothHeight, 0));
    }
  }

  for (let v = 0; v < clothHeight; v++) {
    for (let u = 0; u < clothWidth; u++) {
      constraints.push([particles[u + v * w], particles[u + 1 + v * w], 1 / w]);
      constraints.push([particles[u + v * w], particles[u + (v + 1) * w], 1 / h]);
    }
  }

  return {
    particles,
    constraints,
    simulate(delta) {
      const dtSq = delta * delta;

      // wind
      const windForce = WIND
        ? new THREE.Vector3(Math.sin(Date.now() / 1000) * 5, 0, 2)
        : new THREE.Vector3(0, 0, 0);

      for (let p of particles) {
        p.addForce(new THREE.Vector3(0, -GRAVITY, 0));
        p.addForce(windForce);
        p.integrate(dtSq);
      }

      for (let c of constraints) {
        satisfyConstraints(c[0], c[1], c[2]);
      }

      // Pin left side (flagpole)
      for (let y = 0; y <= h; y++) {
        particles[y * (w + 1)].position.copy(
          particles[y * (w + 1)].original
        );
      }
    },
  };
}
