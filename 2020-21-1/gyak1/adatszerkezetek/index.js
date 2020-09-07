const szamitogep = {
  processzor: 'intel',
  videokartya: 'nVidia',
  gephaz: 'fehér',
  hely: 1000,
  billentyuzetenGombok: {
    a: true,
    b: false,
  },
  hutes: null,
};

const szamitogepek = [
  szamitogep,
  {
    processzor: null,
  },
];

console.log(szamitogep);
console.log(szamitogep.gephaz);
