import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { API_URL } from "../utils/urls";
import _ from "lodash";

import { useSelector } from "react-redux";
import { ui } from "../reducers/ui";

import {
  MainContainer,
  FlexRowContainer,
  MainFlexContainer,
  ChildFlexContainer,
} from "./reusable-components/Containers";

import { StyledA } from "./reusable-components/Text";

const InfoPage = () => {
  const dispatch = useDispatch();
  const [info, setInfo] = useState({});
  const accessToken = useSelector((store) => store.user.accessToken);

  useEffect(() => {
    dispatch(ui.actions.setLoading(true));
    const options = {
      headers: { Authorization: accessToken },
    };

    fetch(API_URL("information"), options)
      .then((res) => res.json())
      .then((data) => {
        setInfo(data.response);
        dispatch(ui.actions.setLoading(false));
      });
  }, [accessToken, dispatch]);

  const categorizedInfo = _(info)
    .groupBy("category")
    .map((info, category) => ({
      category,
      info: info.map((o) =>
        _.omit(o, ["category", "createdAt", "updatedAt"])
      ),
    }))
    .value();

  return (
    <MainContainer>
      <h1>Eco information</h1>
      {Array.isArray(categorizedInfo) &&
        categorizedInfo.map((info) => (
          <MainFlexContainer key={info.category}>
            <h3>{info.category}</h3>
            {info.info.map((info) => (
              <ChildFlexContainer key={info._id}>
                <p>{info.description}</p>
                <FlexRowContainer>
                  <StyledA href={info.source}>
                    Take me to the source{" "}
                  </StyledA>
                  <span role="img" aria-label="about us">
                    &#10548;
                  </span>
                </FlexRowContainer>
              </ChildFlexContainer>
            ))}
          </MainFlexContainer>
        ))}
    </MainContainer>
  );
};

export default InfoPage;
