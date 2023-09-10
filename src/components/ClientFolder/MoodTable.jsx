import { Table, Thead, Tbody, Tr, Th, Td } from "@chakra-ui/react";
import colors from "../Colors";
const data = [
  { day: "Monday", mood: "fantastic", emotion: "relaxed", reason: "partner", stressLevel: "low" },
  { day: "Tuesday", mood: "alright", emotion: "very happy", reason: "weather", stressLevel: "medium" },
  { day: "Wednesday", mood: "pretty good", emotion: "sad", reason: "music", stressLevel: "high" },
  { day: "Thursday", mood: "pretty good", emotion: "very happy", reason: "partner", stressLevel: "medium" },
  { day: "Friday", mood: "alright", emotion: "relaxed", reason: "weather", stressLevel: "low" },
  { day: "Saturday", mood: "fantastic", emotion: "very happy", reason: "partner", stressLevel: "low" },
  { day: "Sunday", mood: "pretty good", emotion: "sad", reason: "stressful day at work", stressLevel: "very high" },
];

const EmotionsTable = () => {
  return (
    <Table variant="simple" >
      <Thead>
        <Tr>
          <Th color={colors.secondary}>Weekday</Th>
          <Th color={colors.secondary}>Mood</Th>
          <Th color={colors.secondary}>Emotion</Th>
          <Th color={colors.secondary}>Reason</Th>
          <Th color={colors.secondary}>Stress Level</Th>
        </Tr>
      </Thead>
      <Tbody>
        {data.map((row) => (
          <Tr key={row.day}>
            <Td>{row.day}</Td>
            <Td>{row.mood}</Td>
            <Td>{row.emotion}</Td>
            <Td>{row.reason}</Td>
            <Td>{row.stressLevel}</Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
};

export default EmotionsTable;
