import actionResolver from "./control-resolvers/action-resolver";
import textblockResolver from "./control-resolvers/textblock-resolver";
import imageResolver from "./control-resolvers/image-resolver";
import tableResolver from "./control-resolvers/table-resolver";
import dataResolver from "./control-resolvers/data-resolver";
import defaultResolver from "./control-resolvers/default-resolver";

const resolversMap: IResolverMapEntry[] = [
  {
    resolver: actionResolver,
    type: "action"
  },
  {
    resolver: dataResolver,
    type: "data"
  },
  {
    resolver: imageResolver,
    type: "image"
  },
  {
    resolver: textblockResolver,
    type: "textblock"
  },
  {
    resolver: tableResolver,
    type: "table"
  }
];

export default function controlResolver(control, context) {
  const resolverObj = resolversMap.find(r => !!control[r.type]);
  if (resolverObj) {
    return resolverObj.resolver(control, context);
  }
  return defaultResolver(control);
}

interface IResolverMapEntry {
  type: string;
  resolver: (control: any, context?: IResolverContext) => void;
}

interface IResolverContext {
  selectedCells: string[];
}