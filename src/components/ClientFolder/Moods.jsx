import { Flex, Text } from "@chakra-ui/react";
import { FaMeh, FaFrown, FaSmile, FaSadCry } from "react-icons/fa";
import colors from "../Colors";
const WeekdaysRow = () => {
  const weekdays = ["Mon", "Tue", "Wed", "Thur", "Fri", "Sat", "Sun"];
  const moods = ["depression", "anxiety", "happiness", "sadness", "happiness", "anxiety", "sadness"];

  const getEmojiByMood = (mood) => {
    switch (mood) {
      case "depression":
        return <FaFrown size={24} color={colors.primary} />;
      case "anxiety":
        return <FaMeh size={24} color={colors.primary} />;
      case "happiness":
        return <FaSmile size={24} color={colors.primary} />;
      case "sadness":
        return <FaSadCry size={24} color={colors.primary} />;
      default:
        return null;
    }
  };

  return (
    <Flex align="center" >      
      {weekdays.map((day, index) => (
        <Flex key={day} direction="column" align="center" mx={2}>
          <Text fontWeight={'500'}>{day}</Text>
          {getEmojiByMood(moods[index])}          
        </Flex>
      ))}
    </Flex>
  );
};

export default WeekdaysRow;
