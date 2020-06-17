import React, { useEffect, useState, useRef } from 'react'
import styled from 'styled-components'

/**
 * Get preview url
 */
const getPreviewUrl = ({ displayed }) => {
    const baseUrl = 'https://feature-website-1-0.foodandwriting.co.uk/'

    switch (displayed._type) {
        case 'about':
            return baseUrl + 'about'

        default:
            return false
    }
}

const IframePreview = ({ document }) => {
    // Get the url
    const url = getPreviewUrl(document)
    if (!url) return <p>Preview couldn't be shown, have you published the post?</p>

    // State
    const [scaling, setScaling] = useState(null)
    let wrapperRef = useRef(null)

    useEffect(() => {
        const wrapperWidth = wrapperRef.current.clientWidth
        const widthRatio = wrapperWidth / 1920
        setScaling(widthRatio)
    }, [])

    return (
        <IframeWrapper ref={wrapperRef} scaling={scaling}>
            {scaling && (
                <iframe src={url} scaling={scaling} />
            )}
        </IframeWrapper>
    )
}

export default IframePreview

/**
 * Styles
 */
const IframeWrapper = styled.div`
    width: 100%;
    max-height: ${ props => props.scaling * 1080}px;
    overflow: hidden;

    iframe {
        width: 1920px;
        height: 1080px;
        transform: scale(${props => props.scaling});
        transform-origin: top left;
    }
`