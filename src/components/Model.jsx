import { useNavigate } from "react-router";
import { useContextApi } from "../context/Context";
import { Button, Input, Textarea } from "./index";

export default function Model() {
  const navigate = useNavigate();
  const { notes, setNotes } = useContextApi();

  const onSubmit = (data) => {
    console.log(data);
    setNotes((prev) => [{ id: Date.now(), ...data }, ...prev]);
    navigate("/Display", { replace: true });
  };

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-5">
      <Input className="elevation " label="Title" />
      <Textarea className="elevation resize-none  " label="Content" />
      <Input className="elevation" label="FullName" />
      <Button className="elevation font-bold mt-4" value="Save Note">
        Save Note
      </Button>
    </form>
  );
}
