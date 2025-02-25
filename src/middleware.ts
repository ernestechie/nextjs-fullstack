import { stackMiddlewares } from "./middleware/stackHandler";
import { withAdmin } from "./middleware/withAdmin";
import { withUser } from "./middleware/withUser";

const middlewares = [withUser, withAdmin];
export default stackMiddlewares(middlewares);
