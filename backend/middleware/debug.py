import logging
import sys

logger = logging.getLogger(__name__)

class RequestDebugMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        try:
            content_length = request.META.get('CONTENT_LENGTH')
            logger.info(f"DEBUG_REQUEST: {request.method} {request.path} | Content-Length: {content_length}")
        except Exception as e:
             logger.error(f"DEBUG_REQUEST_ERROR: {e}")

        response = self.get_response(request)
        return response

    def process_exception(self, request, exception):
        logger.error(f"DEBUG_EXCEPTION: {str(exception)}", exc_info=True)
        return None
