import { Dispatch, type FC, SetStateAction } from "react";

import { Input } from "@/components/ui/input";
import { Search, X } from "lucide-react";

interface Props {
  searchFilter: string;
  setSearchFilter: Dispatch<SetStateAction<string>>;
}

const AdvocateFilter: FC<Props> = ({ searchFilter, setSearchFilter }) => {
  return (
    <div className="w-1/3 flex flex-row gap-2 my-4 items-center">
      <Input
        placeholder="Search for an advocate..."
        type="text"
        value={searchFilter}
        onChange={e => setSearchFilter(e.target.value)}
        startElem={<Search size={18} />}
      />
    </div>
  );
};

export default AdvocateFilter;
