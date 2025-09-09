/*!
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
import { Box, HStack, Skeleton, Text } from "@chakra-ui/react";
import { FiChevronRight } from "react-icons/fi";
import { Link as RouterLink } from "react-router-dom";

import type { TaskInstanceState } from "openapi/requests/types.gen";
import { StateBadge } from "src/components/StateBadge";

export const StatsCard = ({
  colorPalette,
  count,
  icon,
  isLoading = false,
  label,
  link,
  onClick,
  state,
}: {
  readonly colorPalette: string;
  readonly count: number;
  readonly icon?: React.ReactNode;
  readonly isLoading?: boolean;
  readonly label: string;
  readonly link?: string;
  readonly onClick?: () => void;
  readonly state?: TaskInstanceState | null;
}) => {
  if (isLoading) {
    return <Skeleton borderRadius="lg" height="42px" width="175px" />;
  }

  const content = (
    <HStack
      colorPalette={colorPalette}
      alignItems="center"
      borderRadius="lg"
      borderWidth="1px"
      borderColor="colorPalette.200"
      bg="colorPalette.50"
      color="fg.emphasized"
      cursor="pointer"
      p="2"
      transition="all 0.2s"
      _hover={{
        bg: "colorPalette.100",
        borderColor: "colorPalette.300",
      }}
      _dark={{
        bg: "colorPalette.900",
        borderColor: "colorPalette.700",
        _hover: {
          bg: "colorPalette.800",
          borderColor: "colorPalette.600",
        },
      }}
    >
      <StateBadge colorPalette={state ? `taskState.${state}` : colorPalette} mr={2} state={state}>
        {icon}
        {count}
      </StateBadge>

      <Text color="fg" fontSize="sm" fontWeight="bold">
        {label}
      </Text>
      <FiChevronRight size={16} />
    </HStack>
  );

  if (onClick) {
    return (
      <Box as="button" onClick={onClick}>
        {content}
      </Box>
    );
  }

  return <RouterLink to={link ?? "#"}>{content}</RouterLink>;
};
