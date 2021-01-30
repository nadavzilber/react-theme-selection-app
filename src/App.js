import React, { useState, useEffect } from 'react';
import styled, { ThemeProvider } from "styled-components";
import WebFont from 'webfontloader';
import { GlobalStyles } from './theme/GlobalStyles';
import { useTheme } from './theme/useTheme';
import ThemeSelector from './ThemeSelector';
import ThemeCard from './ThemeSelector'
import * as themes from './theme/schema.json';

const Container = styled.div`
  margin: 5px auto 5px auto;
`;

function App() {
  //Get the selected theme, font list, etc.
  const { theme, themeLoaded, getFonts } = useTheme();
  const [selectedTheme, setSelectedTheme] = useState(theme);

  useEffect(() => {
    setSelectedTheme(theme);
  }, [themeLoaded]);

  //Load all the fonts
  useEffect(() => {
    WebFont.load({
      google: {
        families: getFonts()
      }
    });
  });

  //Render if the theme is loaded.
  return (
    <>
      {
        themeLoaded && <ThemeProvider theme={selectedTheme}>
          <GlobalStyles />
          <Container style={{ fontFamily: selectedTheme.font }}>
            <ThemeSelector setter={setSelectedTheme} />
            {
              themes.data.length > 0 &&
              themes.data.map(theme => (
                <ThemeCard theme={theme} key={theme.id} />
              ))
            }
          </Container>
        </ThemeProvider>
      }
    </>
  );
}

export default App;