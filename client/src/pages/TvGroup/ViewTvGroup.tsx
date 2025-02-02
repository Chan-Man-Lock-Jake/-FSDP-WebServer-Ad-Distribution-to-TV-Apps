    import React, { useEffect, useState } from "react";
    import "./ViewTvGroup.css";
    import Header from "./ViewTvGroupHeader";
    import Filter from "./ViewTvGroupFilter";
    import Card from "./ViewTvGroupCard";
    import CardDetail from "./ViewTvGroupCardDetail";

    type Tv = {
    OutletId: string,
    OutletName: string,
    TvId: string;
    TvName: string;
    TvDimension: string;
    };

    type Tag = {
    TagKey: string;
    TagValue: string;
    };

    type TvGroupInfo = {
    TvGroupId: string;
    TvGroupName: string;
    TotalTv: string;
    Location: string;
    Tv: Tv[];
    TvGroupDesc: string;
    TvGroupStatus: string;
    Tag: Tag[];
    Region: string;
    };

    const ViewTvGroup: React.FC = () => {
    // state to store tv grp data fetched from backend
    const [tvGroups, setTvGroups] = useState<TvGroupInfo[]>([]);

    // state to store filtered tv grp data
    const [filteredTvGroups, setFilteredTvGroups] = useState<TvGroupInfo[]>([]);

    // state to store current filters
    const [filters, setFilters] = useState<{
        region?: "North" | "South" | "East" | "West" | "Nil";
        status?: "Online" | "Offline" | "Removed";
    }>({});

    // loading state
    const [loading, setLoading] = useState<boolean>(false);

    // error state
    const [error, setError] = useState<string | null>(null);

    // state to store selected tv group
    const [selectedGroup, setSelectedGroup] = useState<TvGroupInfo | null>(null);

    // fetch all tvs from backend
    const fetchTvGroupsCard = async () => {
        try {
        setLoading(true);
        setError(null);

        const response = await fetch(
            `http://localhost:3000/admin/get-tv-grp-card-info`
        );

        if (!response.ok) {
            throw new Error(`Failed to fetch: ${response.statusText}`);
        }

        const result = await response.json();

        const tvGroupCardData = result.map((item: any) => ({
            TvGroupId: item.TvGroupId,
            TvGroupName: item.TvGroupName,
            TotalTv: item.TotalTv,
            Location: item.Location,
            TvGroupDesc: item.TvGroupDesc,
            TvGroupStatus: item.TvGroupStatus,
            Region: item.Region,
        }));

        // update state w the data
        setTvGroups(tvGroupCardData);
        setFilteredTvGroups(tvGroupCardData);
        } catch (error) {
        console.error("Error fetching Tv Groups:", error);
        setError("Failed to fetch TV groups. Please try again.");
        } finally {
        setLoading(false); // stop loading
        }
    };

    // apply client side filters
    const applyFilters = () => {
        const filtered = tvGroups.filter((group) => {
        const matchRegion = !filters.region || group.Region === filters.region;
        const matchStatus =
            !filters.status || group.TvGroupStatus === filters.status;

        return matchRegion && matchStatus;
        });

        setFilteredTvGroups(filtered);
    };

    // fetch tv on component mount
    useEffect(() => {
        fetchTvGroupsCard();
    }, []);

    // reapply filters whenever filters or tvGroups change
    useEffect(() => {
        applyFilters();
    }, [filters, tvGroups]);

    // func to handle filter changes
    const handleFilterChange = (newFilters: {
        region?: "North" | "South" | "East" | "West" | "Nil";
        status?: "Online" | "Offline" | "Removed";
    }) => {
        setFilters(newFilters);
    };

    // func to handle clicks on selected tv grp card for a detailed view
    const handleCardClick = async(group: TvGroupInfo) => {
        setSelectedGroup(group);
        console.log("Selected grp:", group.TvGroupId);
        try {
            setLoading(true);
            setError(null);

            // fetch the detailed tv grp infp
            const response = await fetch(` http://localhost:3000/admin/get-tv-grp-info/${group.TvGroupId}`);
            if (!response.ok) {
                throw new Error(`Failed to fetch details: ${response.statusText}`)
            }

            const detailedGroup = await response.json();

            setSelectedGroup(detailedGroup);

        } catch(error) {
            console.error("Error fetching TV Group details:", error);
            setError("Failed to load tv group details. Please try again")
        } finally {
            setLoading(false)
        }
    };

    // func to go back from detailed view to card view
    const handleBackClick = () => {
        setSelectedGroup(null);
    };

    return (
        <div className="tv-grp">
        <Header />
        {!selectedGroup ? (
            <>
            <Filter onFilterChange={handleFilterChange} />

            {/* Error msg */}
            {error ? (
                <p className="error-msg">{error}</p>
            ) : loading ? (
                // loading msg
                <p className="loading-msg">Loading TV groups...</p>
            ) : filteredTvGroups.length > 0 ? (
                // tv grp grid
                <div className="tv-grp-grid">
                {filteredTvGroups.map((group) => (
                    <Card
                    key={group.TvGroupId}
                    TvGroupId={group.TvGroupId}
                    TvGroupName={group.TvGroupName}
                    TotalTv={group.TotalTv}
                    Location={group.Location}
                    TvGroupDesc={group.TvGroupDesc}
                    TvGroupStatus={group.TvGroupStatus}
                    Region={group.Region}
                    onClick={() => handleCardClick(group)} // click handler
                    />
                ))}
                </div>
            ) : (
                <p className="no-data-msg">
                No Tv Groups found for the selected filters.
                </p>
            )}
            </>
        ) : (
            <CardDetail group={selectedGroup}  onBackClick={handleBackClick} />
        )}
        </div>
    );
    };

    export default ViewTvGroup;
