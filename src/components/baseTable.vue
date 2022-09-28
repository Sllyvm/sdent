<template>
	<div>
		<el-table :data="data" max-height="500" border style="width: 100%">
			<template v-for="(item,index) in columns" >
				<el-table-column v-if="item.sequence" :type='item.type' :label="item.label" v-bind="item">
				</el-table-column>
				<el-table-column v-else-if="!item.type" :prop="item.prop" :label="item.label" v-bind="item">
				</el-table-column>
				<el-table-column v-else-if="item.type === 'function'"  :label="item.label" v-bind="item">
					<template v-slot="scope">
						<span v-html="item.callback && item.callback(scope.row)"></span>
					</template>
				</el-table-column>
				<el-table-column v-else-if="item.type === 'slot'" :width="item.width" :label="item.label" v-bind="item">
					<template v-slot="scope">
						<slot :name='item.slot_name' :row='scope.row'></slot>
					</template>
				</el-table-column>
			</template>
		</el-table>
	</div>
</template>

<script>
	export default {
		name : 'i-table',
		props : {
			columns : {
				type : Array,
				default : () => []
			},
			data : {
				type : Array,
				default : () => []
			}
		}
	}
</script>

<style>
</style>
