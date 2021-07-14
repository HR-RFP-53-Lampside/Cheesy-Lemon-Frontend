/* eslint-disable import/no-unresolved */
import React, { useMemo, useState } from 'react';
import {
  Box,
  Typography,
  Select,
} from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';
import ListOfRecipes from './ListOfRecipes';

const RecipeFeed = () => {
  const themeDesign = useTheme();
  // user data will be data about recipes and display the title, body and favorite/#ofreviews
  // be able to filter recipe info from select tag by most liked or most commented or my reviews
  const filterOptions = [
    'Most Reviews',
    'Most Favorites',
  ];

  const test = [
    {
      title: 'Banana on a plate',
      body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc fermentum justo nisl, eget tempor augue iaculis ut. Quisque tincidunt, purus vel volutpat congue, tellus massa hendrerit leo, in gravida ex urna vel nisl. Sed ac est id sapien pretium pretium. Duis quis orci sed sem posuere tempor sit amet quis turpis. Ut auctor, dui in condimentum dictum, justo neque congue nisl, in vehicula nisi nisi quis augue. Mauris fringilla nisl in dui suscipit egestas. Ut blandit accumsan neque, gravida faucibus erat malesuada ut. Integer fringilla hendrerit magna, id sodales lorem condimentum at.',
      favorite: 1,
      reviews: 3,
      id: 1,
    },
    {
      title: 'Grape Post Surgery',
      body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc fermentum justo nisl, eget tempor augue iaculis ut. Quisque tincidunt, purus vel volutpat congue, tellus massa hendrerit leo, in gravida ex urna vel nisl. Sed ac est id sapien pretium pretium. Duis quis orci sed sem posuere tempor sit amet quis turpis. Ut auctor, dui in condimentum dictum, justo neque congue nisl, in vehicula nisi nisi quis augue. Mauris fringilla nisl in dui suscipit egestas. Ut blandit accumsan neque, gravida faucibus erat malesuada ut. Integer fringilla hendrerit magna, id sodales lorem condimentum at.',
      favorite: 15,
      reviews: 5,
      id: 3,
    },
    {
      title: 'High Steak Dinner',
      body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc fermentum justo nisl, eget tempor augue iaculis ut. Quisque tincidunt, purus vel volutpat congue, tellus massa hendrerit leo, in gravida ex urna vel nisl. Sed ac est id sapien pretium pretium. Duis quis orci sed sem posuere tempor sit amet quis turpis. Ut auctor, dui in condimentum dictum, justo neque congue nisl, in vehicula nisi nisi quis augue. Mauris fringilla nisl in dui suscipit egestas. Ut blandit accumsan neque, gravida faucibus erat malesuada ut. Integer fringilla hendrerit magna, id sodales lorem condimentum at.',
      favorite: 0,
      reviews: 12,
      id: 7,
    },
    {
      title: 'Bumpy Peanut Butter',
      body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc fermentum justo nisl, eget tempor augue iaculis ut. Quisque tincidunt, purus vel volutpat congue, tellus massa hendrerit leo, in gravida ex urna vel nisl. Sed ac est id sapien pretium pretium. Duis quis orci sed sem posuere tempor sit amet quis turpis. Ut auctor, dui in condimentum dictum, justo neque congue nisl, in vehicula nisi nisi quis augue. Mauris fringilla nisl in dui suscipit egestas. Ut blandit accumsan neque, gravida faucibus erat malesuada ut. Integer fringilla hendrerit magna, id sodales lorem condimentum at.',
      favorite: 9,
      reviews: 30,
      id: 50,
    },
    {
      title: 'Parmesan to Dance',
      body: 'Inspired by the latest BTS song, Permission to dance.',
      favorite: 5,
      reviews: 3,
      id: 20,
    },
  ];

  const [data, setData] = useState(test);

  const [selected, setSelected] = useState(filterOptions[0]);
  const handleChange = (e) => {
    setSelected(e.target.value);
  };

  useMemo(() => {
    const copy = data.slice();
    if (selected === filterOptions[0]) {
      copy.sort((a, b) => b.reviews - a.reviews);
    }
    if (selected === filterOptions[1]) {
      copy.sort((a, b) => b.favorite - a.favorite);
    }
    setData(copy);
  }, [selected]);

  return (
    <Box>
      <Typography
        variant="h2"
        align="center"
        style={{ color: themeDesign.custom.muted.grey }}
      >
        Recipe Feed
      </Typography>
      <Select
        native
        value={selected}
        onChange={handleChange}
        variant="outlined"
        fullWidth
      >
        {filterOptions.map((rows) => (
          <option key={rows} value={rows}>{rows}</option>
        ))}
      </Select>
      {data.length > 0 && (
      <ListOfRecipes
        data={data}
      />
      )}
    </Box>
  );
};

export default RecipeFeed;
