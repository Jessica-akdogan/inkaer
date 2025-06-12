
import React, { useState } from "react";
import EmojiPicker from "emoji-picker-react";
import { useClickOutside } from "../../../hooks/useClickOutside";

interface EmojiPickerButtonProps {
  onSelect: (emoji: string) => void;
  disabled?: boolean;
}

const EmojiPickerButton: React.FC<EmojiPickerButtonProps> = ({ onSelect, disabled }) => {
  const [showPicker, setShowPicker] = useState(false);
  const ref = useClickOutside(() => setShowPicker(false));

  return (
    <div className="emoji-wrapper" ref={ref}>
      <button
        type="button"
        className="emoji-button"
        onClick={() => setShowPicker((prev) => !prev)}
        disabled={disabled}
        title={disabled ? "Log in to use emojis" : "Add emoji"}
      >
        😊
      </button>

      {showPicker && !disabled && (
        <div className="emoji-picker-popup">
          <EmojiPicker
            onEmojiClick={(emojiData) => onSelect(emojiData.emoji)}
          />
        </div>
      )}
    </div>
  );
};

export default EmojiPickerButton;
