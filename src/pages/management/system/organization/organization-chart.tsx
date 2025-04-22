import Color from 'color';
import { Tree, TreeNode } from 'react-organizational-chart';
import styled from 'styled-components';

import { useSettings } from '@/store/settingStore';
import { useThemeToken } from '@/theme/hooks';

import { Organization } from '#/entity';
import { ThemeMode } from '#/enum';

type Props = {
  organizations?: Organization[];
};
export default function OrganizationChart({ organizations = [] }: Props) {
  const themeToken = useThemeToken();
  const { themeMode } = useSettings();
  return (
    <OuterContainer>
      <ChartContainer>
        <Tree
          lineWidth="1px"
          lineColor={
            themeMode === ThemeMode.Light ? themeToken.colorPrimaryBorder : themeToken.colorPrimary
          }
          lineBorderRadius="24px"
          label={
            <StyledNode
              $textColor={
                themeMode === ThemeMode.Light
                  ? themeToken.colorPrimaryTextActive
                  : themeToken.colorPrimaryText
              }
              $backgroundColor={Color(themeToken.colorPrimary).alpha(0.08).toString()}
              $borderColor={Color(themeToken.colorPrimaryBorder).alpha(0.24).toString()}
            >
              Root
            </StyledNode>
          }
        >
          {organizations.map((org) => (
            <OrganizationChartTreeNode key={org.id} organization={org} />
          ))}
        </Tree>
      </ChartContainer>
    </OuterContainer>
  );
}

// Responsive container for the org chart
const ChartContainer = styled.div`
  width: 100%;
  min-width: max-content;
  display: flex;
  justify-content: center;
  padding: 20px 60px; /* Increased horizontal padding */

  /* Ensure the Tree component is properly displayed */
  > div {
    min-width: max-content;
    padding-left: 80px; /* Significant left padding to prevent cutoff */
    margin: 0 auto;
  }

  /* Style for react-organizational-chart to provide more left space */
  .oc-tree {
    padding-left: 30px;
  }
`;

// Outer container to provide horizontal scrolling
const OuterContainer = styled.div`
  width: 100%;
  overflow-x: auto;
  padding: 0;
`;

type OrganizationChartTreeNodeProps = {
  organization: Organization;
};
function OrganizationChartTreeNode({
  organization: { name, children },
}: OrganizationChartTreeNodeProps) {
  const themeToken = useThemeToken();
  const { themeMode } = useSettings();

  return (
    <TreeNode
      label={
        <StyledNode
          $textColor={
            themeMode === ThemeMode.Light
              ? themeToken.colorPrimaryTextActive
              : themeToken.colorPrimaryText
          }
          $backgroundColor={Color(themeToken.colorPrimary).alpha(0.08).toString()}
          $borderColor={Color(themeToken.colorPrimaryBorder).alpha(0.24).toString()}
        >
          {name}
        </StyledNode>
      }
    >
      {children?.map((org) => (
        <OrganizationChartTreeNode key={org.id} organization={org} />
      ))}
    </TreeNode>
  );
}

type StyledNodeProps = {
  $textColor: string;
  $backgroundColor: string;
  $borderColor: string;
};
const StyledNode = styled.div<StyledNodeProps>`
  transition: box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  overflow: hidden;
  position: relative;
  z-index: 0;
  padding: 16px;
  border-radius: 12px;
  display: inline-flex;
  text-transform: capitalize;
  color: ${(props) => props.$textColor};
  background-color: ${(props) => props.$backgroundColor};
  border: 1px solid ${(props) => props.$borderColor};
`;
