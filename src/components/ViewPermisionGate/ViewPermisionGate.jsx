import React from 'react';

const ROLES = {
  admin: 'Administrator',
  finansije: 'Finansije',
  prodavac: 'Prodavac',
};

const ROUTE_PASSPORT = {
  cenaStana: [ROLES.admin, ROLES.finansije],
  izvestaji: [ROLES.admin, ROLES.finansije],
  pregledLokala: [ROLES.admin, ROLES.finansije, ROLES.prodavac],
  pregledGaraza: [ROLES.admin, ROLES.finansije, ROLES.prodavac],
  pregledStanova: [ROLES.admin, ROLES.finansije, ROLES.prodavac],
  stanovi: [ROLES.admin, ROLES.finansije, ROLES.prodavac],
  korisnici: [ROLES.admin, ROLES.finansije],
  klijenti: [ROLES.admin, ROLES.finansije, ROLES.prodavac],
  klijentiid: [ROLES.admin, ROLES.finansije, ROLES.prodavac],
  ponude: [ROLES.admin, ROLES.finansije, ROLES.prodavac],
  ponudeLokala: [ROLES.admin, ROLES.finansije, ROLES.prodavac],
  novaponuda: [ROLES.admin, ROLES.finansije, ROLES.prodavac],
  notfound: [ROLES.admin, ROLES.finansije, ROLES.prodavac],
};
const validateViewPassword = ({ role, routeName }) => {
  const passportByRole = ROUTE_PASSPORT[routeName];
  return passportByRole.some(permision => permision === role);
};

const ForbidenError = () => {
  return (
    <div style={{ height: '100%', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <span>Nemate prava pristupa ovoj stranici.</span>
    </div>
  );
};
function ViewPermisionGate({ role, routeName, component: Component }) {
  const permisionGranted = validateViewPassword({ role, routeName });
  if (!permisionGranted) return <ForbidenError />;

  return <Component />;
}

export default ViewPermisionGate;
