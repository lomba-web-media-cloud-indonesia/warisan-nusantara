// File gak penting cuma biar gak lupa cara panggilnya

import Heading from "./ui/Heading";
import Button from "./ui/Button";

export default function TutorCall() {
  return (
    <div>
      <Heading
        title="Warisan Nusantara"
        align="center"
        size="lg"
        variant="primary"
      />
      <Button
        label="Get Started"
        href="/" //untuk folder dan untuk id href="#"
        variant="primary"
        size="lg"
      />
    </div>
  );
}
