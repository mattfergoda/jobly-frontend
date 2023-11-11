/** NoSearchResults
 * presentational component for when no items match a search.
 */

function NoSearchResults() {
  return (
    <p className="p-3">
      <i>No jobs match your search. Please try again.</i>
    </p>
  );
}

export default NoSearchResults;