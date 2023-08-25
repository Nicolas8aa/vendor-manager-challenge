import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  Link,
  Image,
} from "@nextui-org/react";
import { Submission } from "@/pages/submissions";
import { Button } from "../Form";
import { fetchClient } from "@/services/auth";

export default function SubmissionCard(
  submission: Submission & { handlePay?: (id: number) => void }
) {
  return (
    <Card className="max-w-[400px]">
      <CardHeader className="flex gap-3">
        <div className="flex flex-col">
          <p className="text-md">{submission.id}</p>
          {/* <p className="text-small text-default-500">nextui.org</p> */}
        </div>
      </CardHeader>
      <Divider />
      <CardBody>
        <p>{submission.description}</p>
      </CardBody>
      <Divider />
      <CardFooter>
        <Button
          onClick={() => {
            if (submission.handlePay) submission.handlePay(submission.id);
          }}
        >
          Pay {submission.price}
        </Button>
      </CardFooter>
    </Card>
  );
}
