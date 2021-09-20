import Button from "@material-ui/core/Button";
import { appState } from "./state.js";
import { cloneDeep } from "lodash";
import { useRecoilState, useRecoilCallback } from "recoil";
import { gqlClient, runPrestoQuery, runNativeQuery } from "./queries.js";

function MyButton(args) {
  const [objState, setObjState] = useRecoilState(appState[args.id]);
  const qid = objState.trigger;
  const [queryState, setQueryState] = useRecoilState(appState[qid]);

  // Extract the values for the endpoint query params
  const qargs = useRecoilCallback(({ snapshot }) => async () => {
    return queryState.args.map(async (a) => {
      const qarg = await snapshot.getPromise(appState[a.from]);
      return qarg.value;
    });
  });

  return (
    <Button
      key={args.id + "-Button"}
      id={args.id + "-Button"}
      trigger={args.trigger}
      variant="contained"
      onClick={() => {
        console.log("handleClick(" + args.id + "): ");
        switch (queryState.backend) {
          case "presto":
            runPrestoQuery(queryState, setQueryState);
            break;
          case "native":
            runNativeQuery(gqlClient, qargs, queryState, setQueryState);
            break;
          //case "constant":
          //  runConstantQuery(qid);
          //  break;
          default:
            console.log("Unrecognized backend: " + queryState.backend);
            break;
        }
      }}
    >
      {args.label}
    </Button>
  );
}

export { MyButton };
