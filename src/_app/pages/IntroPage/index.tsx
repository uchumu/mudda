import CustomButtons from "@/components/CustomButtons";
import PostList from "./PostList";

const IntroPage = () => {
  return (
    <>
      <span>CD 테스트4</span>
      <span>CD 테스트4</span>
      <span>CD 테스트4</span>
      <span>CD 테스트4</span>
      <span>CD 테스트4</span>
      <span>CD 테스트4</span>
      <span>CD 테스트4</span>
      <span>CD 테스트4</span>
      <CustomButtons.BottomButton
        title={"hi"}
        onClick={() => console.log("hi")}
        leftButton={{
          title: "left",
          onClick: () => console.log("bye"),
          disabled: true,
        }}
      />
      <PostList />
    </>
  );
};

export default IntroPage;
