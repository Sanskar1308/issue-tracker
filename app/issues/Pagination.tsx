"use client";

import { Button, Flex, Text } from "@radix-ui/themes";
import { useRouter, useSearchParams } from "next/navigation";
import {
  MdArrowLeft,
  MdArrowRight,
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
  const router = useRouter();
  const searchParams = useSearchParams();
  const changePage = (page: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", page.toString());
    router.push("?" + params.toString());
  };
  return (
    <Flex align="center" gap="2">
      <Text>
        Page {currentPage || 1} of {totalPage}
      </Text>
      <Button
        color="gray"
        variant="soft"
        disabled={currentPage <= 1}
        onClick={() => changePage(1)}
      >
        <MdOutlineKeyboardDoubleArrowLeft />
      </Button>
      <Button
        color="gray"
        variant="soft"
        disabled={currentPage <= 1}
        onClick={() => changePage(currentPage - 1)}
      >
        <MdArrowLeft />
      </Button>
      <Button
        color="gray"
        variant="soft"
        disabled={currentPage >= totalPage}
        onClick={() => changePage(currentPage + 1)}
      >
        <MdArrowRight />
      </Button>
      <Button
        color="gray"
        variant="soft"
        disabled={currentPage >= totalPage}
        onClick={() => changePage(totalPage)}
      >
        <MdOutlineKeyboardDoubleArrowRight />
      </Button>
    </Flex>
  );
};

export default Pagination;
