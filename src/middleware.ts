import { stackMiddlewares } from "./middleware/stackHandler";
import { withAdmin } from "./middleware/withAdmin";
import { withPublic } from "./middleware/withPublic";
import { withUser } from "./middleware/withUser";

const middlewares = [withPublic, withUser, withAdmin];
export default stackMiddlewares(middlewares);
