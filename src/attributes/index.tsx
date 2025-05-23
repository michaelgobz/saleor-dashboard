import { ConditionalAttributesFilterProvider } from "@dashboard/components/ConditionalFilter";
import { Route } from "@dashboard/components/Router";
import { sectionNames } from "@dashboard/intl";
import { asSortParams } from "@dashboard/utils/sort";
import { parse as parseQs } from "qs";
import React from "react";
import { useIntl } from "react-intl";
import { RouteComponentProps, Switch } from "react-router-dom";

import { WindowTitle } from "../components/WindowTitle";
import {
  attributeAddPath,
  AttributeAddUrlQueryParams,
  attributeListPath,
  AttributeListUrlQueryParams,
  AttributeListUrlSortField,
  attributePath,
  AttributeUrlQueryParams,
} from "./urls";
import AttributeCreateComponent from "./views/AttributeCreate";
import AttributeDetailsComponent from "./views/AttributeDetails";
import AttributeListComponent from "./views/AttributeList";

const AttributeList: React.FC<RouteComponentProps<{}>> = ({ location }) => {
  const qs = parseQs(location.search.substr(1)) as any;
  const params: AttributeListUrlQueryParams = asSortParams(qs, AttributeListUrlSortField);

  return (
    <ConditionalAttributesFilterProvider locationSearch={location.search}>
      <AttributeListComponent params={params} />
    </ConditionalAttributesFilterProvider>
  );
};
const AttributeCreate: React.FC<RouteComponentProps<{}>> = ({ location }) => {
  const qs = parseQs(location.search.substr(1));
  const params: AttributeAddUrlQueryParams = qs;

  return <AttributeCreateComponent params={params} />;
};
const AttributeDetails: React.FC<RouteComponentProps<{ id: string }>> = ({ location, match }) => {
  const qs = parseQs(location.search.substr(1));
  const params: AttributeUrlQueryParams = qs;

  return <AttributeDetailsComponent id={decodeURIComponent(match.params.id)} params={params} />;
};

export const AttributeSection: React.FC = () => {
  const intl = useIntl();

  return (
    <>
      <WindowTitle title={intl.formatMessage(sectionNames.attributes)} />
      <Switch>
        <Route exact path={attributeListPath} component={AttributeList} />
        <Route exact path={attributeAddPath} component={AttributeCreate} />
        <Route path={attributePath(":id")} component={AttributeDetails} />
      </Switch>
    </>
  );
};
export default AttributeSection;
