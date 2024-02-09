import toast from "react-hot-toast";
import { useSession } from "next-auth/react";
import { db } from "@/firebase/firebase-config";
import { deleteDoc, doc, getDoc, updateDoc } from "firebase/firestore";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { UserProps } from "@/types";

const DeleteButton = ({ id, size }: { id: string; size: number }) => {
  const { data: session } = useSession();
  const [user, setUser] = useState<UserProps>();
  const router = useRouter();

  const getUserFromDb = async () => {
    const docRef = doc(db, `users/${session?.user.id}`);
    const docSnap = await getDoc(docRef);
    setUser(docSnap.data() as UserProps);
  };
  useEffect(() => {
    getUserFromDb();
  }, [session]);

  const deleteFile = async () => {
    if (!session?.user) return;
    const userRef = doc(db, `users/${session.user.id}`);
    const toastId = toast.loading("Deleting...");
    await deleteDoc(doc(db, `users/${session.user.id}/files/${id}`));
    await updateDoc(userRef, {
      storageUsed: user?.storageUsed! - size,
    });
    toast.success("Deleted successfully", {
      id: toastId,
    });
    router.refresh();
  };

  return (
    <>
      <DropdownMenuItem onClick={deleteFile}>Delete</DropdownMenuItem>
    </>
  );
};

export default DeleteButton;
