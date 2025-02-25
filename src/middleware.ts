import { stackMiddlewares } from "./middleware/stackHandler";
import { withAdmin } from "./middleware/withAdmin";
import { withPublicPath } from "./middleware/withPublicRoute";
import { withUser } from "./middleware/withUser";

const middlewares = [withPublicPath, withUser, withAdmin];
export default stackMiddlewares(middlewares);
