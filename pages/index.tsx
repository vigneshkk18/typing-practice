import { useContext, useEffect } from "react";
import type { GetServerSideProps, NextPage } from "next";

import Header from "../components/Header/Header";
import SideMenu from "../components/SideMenu/SideMenu";
import Playground from "../components/Playground/Playground";

import { DifficultyCtx, PlaygroundCtx } from "../Context";
import { apiToUrlMap, baseUrl, formatString } from "../apiToUrlMap";

import { difficultyOptionsMap } from "../types/IPlaygroundContext";

interface HomeProps {
  data: string;
  difficultyOptions: string[];
}

const Home: NextPage<HomeProps> = (props) => {
  const { setDifficulty, setDifficultyOptions } = useContext(DifficultyCtx);
  const { setParaToType } = useContext(PlaygroundCtx);

  useEffect(() => {
    setDifficulty(difficultyOptionsMap.easy);
    setDifficultyOptions(props.difficultyOptions);
    setParaToType(props.data);
  }, [props]);

  return (
    <div className="flex flex-col bg-primary">
      <Header />
      <div className="flex body">
        <div className="min-w-[197px]"></div>
        <Playground />
        <SideMenu />
      </div>
    </div>
  );
};

export default Home;

export const getServerSideProps: GetServerSideProps = async () => {
  const reqUrl = formatString(apiToUrlMap.generateParagraph, {
    difficulty: difficultyOptionsMap.easy,
  });
  const options = {
    headers: {
      Authorization: "Bearer " + process.env.SECRET_KEY,
    },
  };
  const res = await fetch(`${baseUrl}${reqUrl}`, options)
    .then((res) => res.json())
    .catch(console.error);

  const { data: difficultyOptions } = await fetch(
    `${baseUrl}${apiToUrlMap.getDifficultyOptions}`,
    options
  )
    .then((res) => res.json())
    .catch(console.error);

  return {
    props: {
      data: res.data,
      difficultyOptions,
    },
  };
};
