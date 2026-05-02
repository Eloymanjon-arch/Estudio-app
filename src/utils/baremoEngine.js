export function calculateBaremo(data) {
  const servicios = data.servicios * 0.08;
  const otras = data.otras * 0.04;
  const extranjero = Math.min(data.extranjero, 24) * 0.1;
  const cabo = data.cabo * 2;

  const recompensas =
    data.cruzLaureada * 10 +
    data.medallaMilitar * 8 +
    data.cruzGuerra * 7 +
    data.medallasEjercito * 6;

  const extras =
    data.felicitaciones * 0.5 +
    data.condecExt * 0.25;

  const cursos =
    data.cursosEsp * 2 +
    data.cursosInfo * 0.5;

  const total =
    servicios +
    otras +
    extranjero +
    cabo +
    recompensas +
    extras +
    cursos;

  return {
    servicios,
    otras,
    extranjero,
    cabo,
    recompensas,
    extras,
    cursos,
    total,
  };
}