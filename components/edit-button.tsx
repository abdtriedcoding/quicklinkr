import { useState } from "react";
import { Pencil } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import { db } from "@/firebase/firebase-config";
import { doc, updateDoc } from "firebase/firestore";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const EditButton = ({ id }: { id: string }) => {
  const { data: session } = useSession();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const renameFile = async () => {
    if (!session?.user || !id) return;
    setLoading(true);
    const toastId = toast.loading("Renaming.....");
    await updateDoc(doc(db, "users", session.user.id, "files", id), {
      filename: input,
    });
    toast.success("Renamed Successfully", {
      id: toastId,
    });
    router.refresh();
    setInput("");
    setLoading(false);
    setOpen(false);
  };

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Pencil className="h-4 w-4 cursor-pointer" />
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="text-base font-semibold">
              Edit FileName
            </DialogTitle>
          </DialogHeader>
          <Input
            defaultValue={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDownCapture={(e) => {
              if (e.key === "Enter") renameFile();
            }}
          />
          <DialogFooter>
            <Button
              aria-disabled={loading}
              onClick={() => setOpen(false)}
              type="button"
              variant={"ghost"}
            >
              Cancel
            </Button>
            <Button onClick={renameFile} type="submit">
              Save changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default EditButton;
