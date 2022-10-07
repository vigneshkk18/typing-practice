import type { GetServerSideProps, NextPage } from "next";
import { useContext, useEffect } from "react";
import { apiToUrlMap, formatString } from "../apiToUrlMap";
import Header from "../components/Header/Header";
import Playground from "../components/Playground/Playground";
import { difficultyOptionsMap } from "../components/Playground/utils";
import SideMenu from "../components/SideMenu/SideMenu";
import { PlaygroundCtx } from "../Context/PlaygroundContext";

interface HomeProps {
  data: string;
  difficultyOptions: string[];
}

const Home: NextPage<HomeProps> = (props) => {
  const { setParaToType, setDifficultyOptions, setDifficulty } =
    useContext(PlaygroundCtx);

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
  const res = await fetch(reqUrl)
    .then((res) => res.json())
    .catch(console.error);

  const { data: difficultyOptions } = await fetch(
    apiToUrlMap.getDifficultyOptions
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
