import { Button, Flex, Text } from "@radix-ui/themes";
import React from "react";
import {
  MdArrowLeft,
  MdArrowRight,
  MdKeyboardDoubleArrowLeft,
  MdOutlineKeyboardDoubleArrowLeft,
  MdOutlineKeyboardDoubleArrowRight,
} from "react-icons/md";

interface Props {
  itemCount: number;
  currentPage: number;
  pageSize: number;
}

const Pagination = ({ itemCount, currentPage, pageSize }: Props) => {
  const totalPage = Math.ceil(itemCount / pageSize);
  return (
    <Flex align="center" gap="2">
      <Text>
        Page {currentPage} of {totalPage}
      </Text>
      <Button color="gray" variant="soft" disabled={currentPage <= 1}>
        <MdOutlineKeyboardDoubleArrowLeft />
      </Button>
      <Button color="gray" variant="soft" disabled={currentPage <= 1}>
        <MdArrowLeft />
      </Button>
      <Button color="gray" variant="soft" disabled={currentPage >= totalPage}>
        <MdArrowRight />
      </Button>
      <Button color="gray" variant="soft" disabled={currentPage >= totalPage}>
        <MdOutlineKeyboardDoubleArrowRight />
      </Button>
    </Flex>
  );
};

export default Pagination;
