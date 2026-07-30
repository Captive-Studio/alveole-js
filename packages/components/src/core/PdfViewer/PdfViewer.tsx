import WebView from 'react-native-webview';
import { Spinner } from '../../ui/Spinner';
import { Box } from '../Box';

import type { PdfViewerProps } from './PdfViewer.props';

export const PdfViewer = (props: PdfViewerProps) => {
  const { source, headers } = props;

  return (
    <Box tag="pdf-viewer" flex={1}>
      <WebView
        source={{ uri: source, headers }}
        startInLoadingState
        renderLoading={() => (
          <Box flex={1} style={{ alignItems: 'center', justifyContent: 'center' }}>
            <Spinner size="lg" />
          </Box>
        )}
        style={{ flex: 1 }}
      />
    </Box>
  );
};
