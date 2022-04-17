import Button from "@components/ui/button";
import { useUI } from "@contexts/ui.context";

export default function JoinButton() {
  const { openModal, setModalView } = useUI();
  function handleJoin() {
    setModalView("LOGIN_VIEW");
    return openModal();
  }
  return (
    <Button className="font-semibold" size="small" onClick={handleJoin}>
      Entrar
    </Button>
  );
}
