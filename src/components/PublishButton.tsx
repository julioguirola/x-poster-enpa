"use client";

import { tweetear } from "@/actions/tweet";
import { Button } from "./ui/button";
import { useFormState } from "react-dom";

const initialState = {
  message: "",
};

interface Data {
  text1: string;
  text2: string | undefined;
  img: string | undefined;
}

export default function ({ text1, text2, img }: Data) {
  const [state, formAction] = useFormState(tweetear, initialState);

  return (
    <form action={formAction} className="flex flex-col gap-3">
      <input name="text1" defaultValue={text1} hidden />
      <input name="text2" defaultValue={text2} hidden />
      <input name="img" defaultValue={img} hidden />
      <p aria-live="polite">{state.message}</p>
      <Button>Publicar</Button>
    </form>
  );
}
