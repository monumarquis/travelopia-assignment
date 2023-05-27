import { FC } from 'react'
import '../styles/spinner.css'
import { Box, Flex } from '@chakra-ui/react'
import { spinnerProps } from '../types/user'

const LoadingSpinner: FC<spinnerProps> = ({ Sectionheight, loaderHeight, loaderWidth }) => {
    return (
        <div className="spinnerContainer">
            <div className="spinner"></div>
            <div className="loader">
                <p>loading</p>
                <div className="words">
                    <span className="word">name</span>
                    <span className="word">email</span>
                    <span className="word">budget</span>
                    <span className="word">country</span>
                </div>
            </div>
        </div>
    )
}

export default LoadingSpinner