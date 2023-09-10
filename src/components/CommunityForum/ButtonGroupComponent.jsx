import React, { useEffect, useState } from "react";
import { Button, ButtonGroup } from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import { addPostTags } from "../../store/slice/TagsSlice";

function ButtonGroupComponent() {
  const [selectedTags, setSelectedTags] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(addPostTags(selectedTags));
  }, [selectedTags]);

  const removeTag = (tag) => {
    setSelectedTags((prevTags) => prevTags.filter((object) => object != tag));
    console.log("selected tags after removal: ", selectedTags);
  };

  const updateSelectedTags = (tag) => {
    console.log("selected tag: ", tag);
    if (selectedTags.length == 0) {
      setSelectedTags([tag]);
    } else {
      const found = selectedTags.find((object) => object == tag);
      {
        !found && setSelectedTags((prevTags) => [...prevTags, tag]);
      }
    }
    console.log("selected tags:", selectedTags);
    dispatch(addPostTags(selectedTags));
  };

  return (
    <div className="buttons-class">
      <ButtonGroup gap="4" className="selected-tags">
        <h3>Selected tags:</h3>

        {selectedTags.map((tag, id) => {
          {
            if (tag == "Anxiety") {
              return (
                <Button
                  key={id}
                  colorScheme="purple"
                  size="sm"
                  onClick={() => removeTag(tag)}
                >
                  {tag} x
                </Button>
              );
            } else if (tag == "Depression") {
              return (
                <Button
                  key={id}
                  colorScheme="pink"
                  size="sm"
                  onClick={() => removeTag(tag)}
                >
                  {tag} x
                </Button>
              );
            } else if (tag == "Advice") {
              return (
                <Button
                  key={id}
                  colorScheme="orange"
                  size="sm"
                  onClick={() => removeTag(tag)}
                >
                  {tag} x
                </Button>
              );
            }
          }
        })}
      </ButtonGroup>
      <ButtonGroup gap="4">
        <h3>Select tags:</h3>
        <Button
          onClick={() => {
            updateSelectedTags("Anxiety");
          }}
          colorScheme="purple"
          size="sm"
        >
          Anxiety
        </Button>

        <Button
          onClick={() => {
            updateSelectedTags("Depression");
          }}
          colorScheme="pink"
          size="sm"
        >
          Depression
        </Button>

        <Button
          onClick={() => {
            updateSelectedTags("Advice");
          }}
          colorScheme="orange"
          size="sm"
        >
          Advice
        </Button>
      </ButtonGroup>
    </div>
  );
}

export default ButtonGroupComponent;
