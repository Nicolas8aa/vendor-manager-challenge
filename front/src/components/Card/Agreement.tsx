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
import { Button } from "../Form";
import { Agreement } from "@/pages/agreements";

export default function AgreementCard(agreement: Agreement) {
  return (
    <Card className="max-w-[400px]">
      <CardHeader className="flex gap-3">
        <div className="flex flex-col">
          <h3 className="text-small text-default-500">
            Last modified:{" "}
            {new Date(agreement.createdAt).toLocaleDateString("en-US")}
          </h3>
          <p className="text-md font-semibold mt-2">
            agreement id: {agreement.id}
          </p>
          {/* <p className="text-small text-default-500">nextui.org</p> */}
        </div>
      </CardHeader>
      <Divider />
      <CardBody>
        <p className="text-md font-semibold mt-0">Agreement terms</p>
        <p>{agreement.terms}</p>
      </CardBody>
      <Divider />
      <CardFooter>
        <p className="text-md mt-2">Status: {agreement.status}</p>
      </CardFooter>
    </Card>
  );
}
