import { toast } from "react-toastify";

export const useApply = async (hackathonId: string, participantId: string) => {
    try {
      const response = await fetch("/api/apply", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          hackathonId,
          participantId,
        }),
      });
  
      const data = await response.json();
      if (response.ok) {
        toast("Applied Successfully")
      } else {
        toast("Already Applied / Event Closed")
      }
    } catch (error) {
      toast("Error Adding Participant")
    }
  };
  