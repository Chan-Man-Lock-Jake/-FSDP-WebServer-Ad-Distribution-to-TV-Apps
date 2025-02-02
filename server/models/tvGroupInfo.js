import { ExpressionType } from '@aws-sdk/client-s3';
import { dynamoDB } from './dynamodb.js';
import { ScanCommand, QueryCommand } from '@aws-sdk/lib-dynamodb';
import { compare } from 'bcrypt';

async function getTvGroupCardInfo(){
    const params = {
        TableName: 'TvGroup',
        ProjectionExpression: '#groupId, #groupName, #totalTv, #location, #tv, #groupDesc, #groupStatus, #tag, #region', //#tag
        ExpressionAttributeNames: {
            '#groupId': 'TvGroupId',
            '#groupName': 'TvGroupName',
            '#totalTv': 'TotalTv',
            '#location': 'Location',
            '#tv': 'Tv',
            '#groupDesc': 'TvGroupDesc',
            '#groupStatus': 'TvGroupStatus',
            '#tag': 'Tag',
            '#region': 'Region',
        },
        FilterExpression: 'EntityType = :groupType',
        ExpressionAttributeValues: {
            ':groupType': 'GROUP',
        },
    };

    try{
        const {Items} = await dynamoDB.send(new ScanCommand(params));

        return Items.map((item) => ({
            TvGroupId: item.TvGroupId,
            TvGroupName: item.TvGroupName,
            TotalTv: item.TotalTv,
            OutletName: item.OutletName,
            Location: item.Location,
            Tv: Array.isArray(item.Tv) ? item.Tv.map((tv) => {
                if (!tv?.OutletId || !tv?.OutletName || !tv?.TvId || !tv?.TvName || !tv?.TvDimension) {
                    console.warn("Unexpected TV structure:", tv)
                    return {OutletId: null, OutletName: null, TvId: null, TvName: null, TvDimension: null};
                }
                return {
                    OutletId:tv.OutletId,
                    OutletName: tv.OutletName,
                    TvId:tv.TvId,
                    TvName:tv.TvName,
                    TvDimension:tv.TvDimension,
                };
            })
            :[], // defaults to empty array
            TvGroupDesc: item.TvGroupDesc,
            TvGroupStatus: item.TvGroupStatus,
            Tag: Array.isArray(item.Tag) ? item.Tag.map((tag) => {
                if (!tag?.TagKey || !tag?.TagValue) {
                    console.warn("Unexpected Tag structure:", tag)
                    return {TagKey: null, TagValue: null};
                }
                return {
                    TagKey:tag.TagKey,
                    TagValue:tag.TagValue,
                };
            })
            :[], // defaults to empty array
            Region: item.Region,
        }));

    } catch(error){
        console.error('Error retrieving TvGroupInfo data:', error);
        throw error;
    }
}

// get using id 
async function getTvGroupInfo(TvGroupId){
    const groupParams = {
        TableName: 'TvGroup',
        KeyConditionExpression: '#groupId = :groupId',
        ExpressionAttributeNames: {
            '#groupId': 'TvGroupId',
        },
        ExpressionAttributeValues: {
            ':groupId': TvGroupId,
        }
    };

    try{
        const { Items } = await dynamoDB.send(new QueryCommand(groupParams));
        if (!Items || Items.length === 0) {
            throw new Error("No TV Group found");
        }

        const item = Items[0]

        const tagParams = {
            TableName: 'TvGroup',
            KeyConditionExpression: '#groupId = :groupId AND #entityType = :tagType',
            ExpressionAttributeNames: {
                '#groupId': 'TvGroupId',
                '#entityType': "EntityType"
            },
            ExpressionAttributeValues: {
                ':groupId': TvGroupId,
                ':tagType': 'TAG',
            }
        };

    

        const tagResult = await dynamoDB.send(new QueryCommand(tagParams));
        //console.log('tagResult.Items:', tagResult.Items);


        // parse the tags
        const tags = tagResult.Items?.flatMap((tag) => {
            // console.log("tagresult.Items", JSON.stringify(tagResult.Items, null, 2)); // debug purpose
            const tagList = tag?.Tag || [];
            // console.log("tagList", tagList); // debug purpose

            if (Array.isArray(tagList)) {
                return tagList.map((tagItem) => {
                    return {
                        TagKey: tagItem.TagKey || 'Unknown Key',
                        TagValue: tagItem.TagValue || 'Unknown value'
                    };
                });
            }
            return [];
        }) || [];


        return {
            TvGroupId: item.TvGroupId,
            TvGroupName: item.TvGroupName,
            TotalTv: item.TotalTv,
            OutletName: item.OutletName,
            Location: item.Location,
            Tv: Array.isArray(item.Tv) ? item.Tv.map((tv) => ({
                OutletId: tv.OutletId || '',
                OutletName: tv.OutletName || '',
                TvId: tv.TvId || '',
                TvName: tv.TvName || '',
                TvDimension: tv.TvDimension || '',
            })) : [],
            TvGroupDesc: item.TvGroupDesc,
            TvGroupStatus: item.TvGroupStatus,
            Region: item.Region,
            Tag: tags,
        }

    } catch(error){
        console.error('Error retrieving TvGroupInfo data:', error);
        throw error;
    }
}

// fetch all outlets
async function getAllOutlets(){
    const params = {
        TableName: 'TvOutlet',
        ProjectionExpression: 'OutletId, Company, OutletName, TotalTv'
    };

    try {
        const { Items } = await dynamoDB.send(new ScanCommand(params));

        // group by outletId to ensure only unique outlets are returned
        const uniqueOutlets = Object.values(
            Items.reduce((acc, item) => {
                if (!acc[item.OutletId]) {
                    acc[item.OutletId] = {
                        OutletId: item.OutletId,
                        Company: item.Company,
                        OutletName: item.OutletName,
                        TotalTv: item.TotalTv
                    };
                }
                return acc;
            }, {}), 
        );
        return uniqueOutlets;
    } catch (error) {
        console.error('Error retrieving outlets:', error)
        throw error;
    }
}

async function getOutletsNTvsById(OutletId){
    const params = {
        TableName: 'TvOutlet',
        KeyConditionExpression: '#outletId = :outletId',
        ExpressionAttributeNames: {
            '#outletId': 'OutletId',
        },
        ExpressionAttributeValues: {
            ':outletId': OutletId,
        }
    };

    try {
        const { Items } = await dynamoDB.send(new QueryCommand(params));

        //const item = Items[0]

        return Items.map((item) => ({
            TvId: item.TvId,
            TvName: item.TvName,
            TvDimension: item.TvDimension,
        }));
    } catch (error) {
        console.error('Error retrieving outlet data:', error)
        throw error;
    }
}

async function createNewTvGroup(){
    const params = {
        TableName: 'TvGroup'
    }
}

export {getTvGroupCardInfo, getTvGroupInfo, getAllOutlets, getOutletsNTvsById};
