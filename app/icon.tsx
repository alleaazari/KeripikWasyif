import { ImageResponse } from 'next/og'

// Route segment config
export const runtime = 'edge'

// Image metadata
export const alt = 'Keripik Wasyif'
export const size = {
    width: 32,
    height: 32,
}
export const contentType = 'image/png'

// Image generation
export default function Icon() {
    return new ImageResponse(
        (
            // ImageResponse render element
            <div
                style={{
                    fontSize: 24,
                    background: 'transparent',
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: '50%',
                    overflow: 'hidden',
                }}
            >
                <img
                    src={new URL('./icon.png', import.meta.url).toString()}
                    style={{
                        width: '140%', // Scale up significantly to fill the space
                        height: '140%',
                        objectFit: 'cover',
                    }}
                />
            </div>
        ),
        // ImageResponse options
        {
            ...size,
        }
    )
}
