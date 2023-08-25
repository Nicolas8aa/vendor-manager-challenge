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
import { Buyer } from "@/pages/admin/best-buyers";
import { Submission } from "@/pages/submissions";

export default function BuyerCard({
  buyer,
  submission,
}: {
  buyer: Buyer;
  submission: Submission;
}) {
  return (
    <Card className="max-w-[400px]">
      <CardHeader className="z-0">
        <h3 className="text-small text-default-500 ">
          Payment date:{" "}
          {new Date(submission.paymentDate as any).toLocaleDateString("en-US")}
        </h3>
      </CardHeader>
      <Divider />
      <CardBody>
        <p className="text-md font-semibold ">Submission information</p>
        <p className="text-lg">Paid: ${submission.price}</p>

        <p className="text-md font-semibold mt-2">Buyer information</p>
        <p>
          {buyer.firstName} {buyer.lastName}
        </p>
        <p>{buyer.email}</p>
      </CardBody>
    </Card>
  );
}
