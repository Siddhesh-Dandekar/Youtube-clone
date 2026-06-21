import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import Content from './content';

describe('Content', () => {
  it('renders a populated video card without fetching channel data', () => {
    render(
      <MemoryRouter>
        <Content
          data={{
            _id: 'video-1',
            title: 'Searchable music video',
            thumbnailUrl: 'https://example.com/thumb.jpg',
            views: 1200,
            uploadDate: new Date().toISOString(),
            channel: {
              channelName: 'Owner Channel',
              channelProfile: 'https://example.com/avatar.jpg',
            },
          }}
        />
      </MemoryRouter>,
    );

    expect(screen.getByText('Searchable music video')).toBeInTheDocument();
    expect(screen.getByText('Owner Channel')).toBeInTheDocument();
    expect(screen.getByRole('link')).toHaveAttribute('href', '/watch/video-1');
  });
});
