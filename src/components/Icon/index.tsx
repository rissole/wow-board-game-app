import styled from "styled-components";

interface IconProps {
    width: number;
    height: number;
    path: string
    isRound?: boolean;
}

const Icon = styled.div<IconProps>((props) => ({
    width: props.width,
    height: props.height,
    backgroundImage: `url(${props.path})`,
    backgroundSize: '100% 100%',
    ...(props.isRound ? {borderRadius: '50%'} : {})
}))

export default Icon
