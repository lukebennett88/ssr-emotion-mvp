import { css } from "@emotion/css";
import type { NextPage } from "next";
import { ContentDialog } from "../components/content-dialog";

const Home: NextPage = () => {
  return (
    <main
      className={css({
        padding: "1rem",
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
      })}
    >
      <h1>ContentDialog MVP</h1>
      <div>
        <ContentDialog
          title="Title"
          description="Uncontrolled example"
          trigger={
            <button
              type="button"
              className={css({
                border: "1px solid black",
                fontSize: "1rem",
                background: "#fff",
                paddingTop: "0.25rem",
                paddingBottom: "0.25rem",
                paddingLeft: "0.5rem",
                paddingRight: "0.5rem",
              })}
            >
              Open dialog
            </button>
          }
          size="medium"
        >
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit.
            Consequatur optio molestiae dolorem qui omnis reiciendis dignissimos
            numquam aperiam, rem natus, totam, repudiandae cum voluptatibus
            quos? Dicta, odio! Accusantium, reiciendis quidem.
          </p>
        </ContentDialog>
      </div>
    </main>
  );
};

export default Home;
