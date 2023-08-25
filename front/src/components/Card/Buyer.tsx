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
import { Buyer } from "@/pages/admin/best-buyers";

export default function BuyerCard(buyer: Buyer) {
  return (
    <Card className="max-w-[400px]">
      <CardBody>
        <p className="text-md font-semibold mt-2">Buyer information</p>
        <p>
          {buyer.firstName} {buyer.lastName}
        </p>
        <p>{buyer.email}</p>
      </CardBody>
      <Divider />
      <CardFooter>
        <p className="text-md mt-2">Submissions paid: 100</p>
      </CardFooter>
    </Card>
  );
}
