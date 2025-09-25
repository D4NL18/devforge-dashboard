import Input from "Components/Input";
import styles from "./index.module.scss";
import { Address } from "types/address";
import { useState, useEffect } from "react";

interface AddressFormProps {
  defaultValue?: Address;
  onChange: (address: Address) => void;
}

export default function AddressForm({
  defaultValue,
  onChange,
}: AddressFormProps) {
  const [cep, setCep] = useState(defaultValue?.cep || "");
  const [city, setCity] = useState(defaultValue?.city || "");
  const [state, setState] = useState(defaultValue?.state || "");
  const [country, setCountry] = useState(defaultValue?.country || "");
  const [street, setStreet] = useState(defaultValue?.street || "");
  const [number, setNumber] = useState(defaultValue?.number || "");
  const [complement, setComplement] = useState(defaultValue?.complement || "");

  useEffect(() => {
    onChange({ cep, city, state, country, street, number, complement });
  }, [cep, city, state, country, street, number, complement, onChange]);

  return (
    <section className={styles.addressForm}>
      <h2>Endereço</h2>
      <div className={styles.inputContainer}>
        <Input
          type="text"
          placeholder="CEP"
          value={cep}
          onChange={(e) => setCep(e.target.value)}
          required
        />
        <Input
          type="text"
          placeholder="Cidade"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          required
        />
        <Input
          type="text"
          placeholder="Estado"
          value={state}
          onChange={(e) => setState(e.target.value)}
          required
        />
        <Input
          type="text"
          placeholder="País"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          required
        />
        <Input
          type="text"
          placeholder="Rua"
          value={street}
          onChange={(e) => setStreet(e.target.value)}
          required
        />
      </div>
      <div className={styles.numberComplementContainer}>
        <Input
          type="text"
          placeholder="Número"
          value={number}
          onChange={(e) => setNumber(e.target.value)}
          required
        />
        <Input
          type="text"
          placeholder="Complemento"
          value={complement}
          onChange={(e) => setComplement(e.target.value)}
          required
        />
      </div>
    </section>
  );
}
