import { useQuery } from '@tanstack/react-query';

const fetchSuggestions = async ({ queryKey }) => {
    const query = queryKey[1];
    const res = await fetch(`/api/autocomplete?query=${query}`);

    const contentType = res.headers.get('content-type');
    if (contentType && contentType.indexOf('application/json') !== -1) {
        return res.json();
    } else {
        throw new Error('Invalid JSON response');
    }
};

const useSuggestions = (query) => {
    return useQuery({
        queryKey: ['suggestions', query],
        queryFn: fetchSuggestions,
        enabled: !!query,
    });
};

export { useSuggestions };
