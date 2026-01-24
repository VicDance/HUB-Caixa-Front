interface Props {
  onChange: (filters: {
    name?: string;
    species?: string;
  }) => void;
}

export const Filter: React.FC<Props> = ({ onChange }) => {
  return (
    <section>
      <input
        placeholder="Nombre"
        onChange={(e) => onChange({ name: e.target.value })}
      />
      <input
        placeholder="Especie"
        onChange={(e) => onChange({ species: e.target.value })}
      />
    </section>
  );
};
