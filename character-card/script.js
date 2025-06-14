const character = {
  name: "Gun Skull",
  class: "Warlock",
  level: 5,
  health: 100,
  image: 'imgs/warlock_desperado.png',
  attacked() {
    if (this.health >= 20) {
      this.level -= 1;
      this.health -= 20;
      return `${this.name} was attacked! Lost 1 level and 20 health.`;
    } else {
      alert('Character Died');
      return `${this.name} has died.`;
    }
  },
  levelUp() {
    this.level += 1;
    this.health += 20;
    return `${this.name} leveled up! Gained 1 level and 20 health.`;
  }
};

function renderCharacter() {
  document.querySelector(".name").textContent = character.name;
  document.getElementById("class").textContent = character.class;
  document.getElementById("level").textContent = character.level;
  document.getElementById("health").textContent = character.health;
  document.querySelector(".image").src = character.image;
  document.querySelector(".image").alt = character.name;
}

document.getElementById("attacked").addEventListener("click", () => {
  const log = character.attacked();
  document.getElementById("log").textContent = log;
  renderCharacter();
});

document.getElementById("levelup").addEventListener("click", () => {
  const log = character.levelUp();
  document.getElementById("log").textContent = log;
  renderCharacter();
});

renderCharacter();