import React, { useState, useRef} from 'react';

export default function Input() {
  const [inputValue, setInputValue] = useState('');
  const [chips, setChips] = useState([]);
  const [focusedChip, setFocusedChip] = useState(null);
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [availableItems, setAvailableItems] = useState([
    { name: 'John Doe', email: 'john.doe@example.com', image_url: 'https://randomuser.me/api/portraits/men/1.jpg' },
    { name: 'Jane Smith', email: 'jane.smith@example.com', image_url: 'https://randomuser.me/api/portraits/women/2.jpg' },
    { name: 'Alice Johnson', email: 'alice.johnson@example.com', image_url: 'https://randomuser.me/api/portraits/women/3.jpg' },
    { name: 'Bob Brown', email: 'bob.brown@example.com', image_url: 'https://randomuser.me/api/portraits/men/4.jpg' },
    { name: 'Eva White', email: 'eva.white@example.com', image_url: 'https://randomuser.me/api/portraits/women/5.jpg' },
    { name: 'David Lee', email: 'david.lee@example.com', image_url: 'https://randomuser.me/api/portraits/men/6.jpg' },
    { name: 'Megan Taylor', email: 'megan.taylor@example.com', image_url: 'https://randomuser.me/api/portraits/women/7.jpg' },
    { name: 'Chris Wilson', email: 'chris.wilson@example.com', image_url: 'https://randomuser.me/api/portraits/men/8.jpg' },
    { name: 'Sophie Miller', email: 'sophie.miller@example.com', image_url: 'https://randomuser.me/api/portraits/women/9.jpg' },
    { name: 'Michael Davis', email: 'michael.davis@example.com', image_url: 'https://randomuser.me/api/portraits/men/10.jpg' },
    { name: 'Olivia Thomas', email: 'olivia.thomas@example.com', image_url: 'https://randomuser.me/api/portraits/women/11.jpg' },
    { name: 'Daniel Clark', email: 'daniel.clark@example.com', image_url: 'https://randomuser.me/api/portraits/men/12.jpg' },
    { name: 'Emily Turner', email: 'emily.turner@example.com', image_url: 'https://randomuser.me/api/portraits/women/13.jpg' },
    { name: 'Ryan Garcia', email: 'ryan.garcia@example.com', image_url: 'https://randomuser.me/api/portraits/men/14.jpg' },
    { name: 'Ava Hernandez', email: 'ava.hernandez@example.com', image_url: 'https://randomuser.me/api/portraits/women/15.jpg' },
    { name: 'James Martinez', email: 'james.martinez@example.com', image_url: 'https://randomuser.me/api/portraits/men/16.jpg' },
    { name: 'Grace Robinson', email: 'grace.robinson@example.com', image_url: 'https://randomuser.me/api/portraits/women/17.jpg' },
    { name: 'William Hall', email: 'william.hall@example.com', image_url: 'https://randomuser.me/api/portraits/men/18.jpg' },
    { name: 'Emma Young', email: 'emma.young@example.com', image_url: 'https://randomuser.me/api/portraits/women/19.jpg' },
    { name: 'Liam King', email: 'liam.king@example.com', image_url: 'https://randomuser.me/api/portraits/men/20.jpg' },
    { name: 'Chloe Cooper', email: 'chloe.cooper@example.com', image_url: 'https://randomuser.me/api/portraits/women/21.jpg' },
    { name: 'Isabella Wright', email: 'isabella.wright@example.com', image_url: 'https://randomuser.me/api/portraits/women/23.jpg' },
    { name: 'Noah Parker', email: 'noah.parker@example.com', image_url: 'https://randomuser.me/api/portraits/men/24.jpg' },
    { name: 'Sophia Hill', email: 'sophia.hill@example.com', image_url: 'https://randomuser.me/api/portraits/women/25.jpg' },
  ]);

  const inputRef = useRef(null);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleItemClick = (item) => {
    setChips([...chips, item]);
    setAvailableItems(availableItems.filter((i) => i !== item));
    setInputValue('');
    inputRef.current.focus();
  };

  const handleChipRemove = (chip) => {
    setChips(chips.filter((c) => c !== chip));
    setAvailableItems([...availableItems, chip]);
    inputRef.current.focus();
  };

  const handleInputKeyDown = (event) => {
    if (event.key === 'Backspace' && inputValue === '' && chips.length > 0 && focusedChip == null) {
      setFocusedChip(chips.length - 1);
    } else if (event.key === 'Backspace' && focusedChip !== null) {
      handleChipRemove(chips[focusedChip]);
      setFocusedChip(null);
    }
  };

  const handleInputFocus = () => {
    setIsInputFocused(true);
  };

  return (
    <div className="input-container">
      <div className="chips">
        {chips.map((chip, index) => (
          <div key={index} className={index === focusedChip ? 'chip highlight' : 'chip'}>
            <img src={chip.image_url} alt="User Profile" width="35px" />
            <div className="chip-name">{chip.name}</div>
            <span onClick={() => handleChipRemove(chip)}>X</span>
          </div>
        ))}
        <div>
          <input
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            onKeyDown={handleInputKeyDown}
            onFocus={handleInputFocus}
            placeholder="Add new user..."
          />
          {isInputFocused && (
            <ul className="suggestions">
              {availableItems
                .filter((item) => item?.name.toLowerCase().includes(inputValue.toLowerCase()))
                .map((item, index) => (
                  <li key={index} onClick={() => handleItemClick(item)}>
                    <div className="flex-center">
                      <img src={item.image_url} alt="User Profile" width="50px" />
                      {item.name}
                    </div>
                    <div className="email">{item.email}</div>
                  </li>
                ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}